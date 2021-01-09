import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface AddValueFunc {
  (value: boolean): void;
}

interface AddValueFuncIntegert {
  (value: number): void;
}

interface IFSimple {
  ():void
}

interface AuthcontextData {
  authenticated: boolean;
  addStatusAuthenticated: AddValueFunc;
  whilleLoading: AddValueFunc;
  loading: boolean;
  taskChangUpdate: AddValueFunc;
  taskChanged: boolean;
  isModalVisible: boolean;
  updateIsModalVisible: AddValueFunc;
  deleteTask: AddValueFuncIntegert;
  ModalconfirmationDelete:IFSimple
}

interface AuxProps {
  children: React.ReactNode;

}




const AuthContext = createContext<AuthcontextData>({} as AuthcontextData);

const AuthProvider = (props: AuxProps) => {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [taskChanged, setTaskChanged] = useState(false);
  const [taskId, setTaskId] = useState(Number);
  
  

  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      addStatusAuthenticated(true);
    }

    whilleLoading(false);

  }, []);

  const addStatusAuthenticated = function (value: boolean) {
    setAuthenticated(value);
  }

  const whilleLoading = function (value: boolean) {
    setLoading(value);
  }

  const taskChangUpdate = async function (value: boolean) {
    setTaskChanged(value);
  }

  const deleteTask = async function (id: number) {
    setTaskId(id);
    setIsModalVisible(true);
    

  }

  const updateIsModalVisible = function (value: boolean) {
    setIsModalVisible((preveValue)=> value);
  }


  const ModalconfirmationDelete = async function(){
    setTaskChanged(true);
    await api.delete(`/task/${taskId}`);
    
    setIsModalVisible(false);
    setTaskChanged(false);
  }

  return (
    <AuthContext.Provider value={{
      authenticated,
      addStatusAuthenticated,
      whilleLoading,
      loading,
      taskChangUpdate,
      taskChanged,
      isModalVisible,
      updateIsModalVisible,
      deleteTask,
      ModalconfirmationDelete
    }
    }
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };