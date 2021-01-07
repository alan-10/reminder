import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface AddValueFunc {
  (value: boolean):void;
}

interface addValueFunString  {
  (value: string): void;
}

 
interface AuthcontextData {
  authenticated: boolean;
  addStatusAuthenticated: AddValueFunc;
  whilleLoading: AddValueFunc;
  loading: boolean;
  taskChangUpdate: AddValueFunc;
  taskChanged: boolean;
  
}

interface AuxProps {
  children: React.ReactNode;
  
}




const AuthContext = createContext<AuthcontextData>({} as AuthcontextData);

const AuthProvider = (props: AuxProps) => {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [taskChanged, setTaskChanged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      addStatusAuthenticated(true);
    }

    whilleLoading(false);
    
  }, []);

  const addStatusAuthenticated = function(value: boolean){
    setAuthenticated(value);
  }

  const whilleLoading = function(value: boolean){
    setLoading(value);
  }

  const taskChangUpdate = async function(value: boolean){
       setTaskChanged(value);
  }
   
  return (
    <AuthContext.Provider value={{
      authenticated,
      addStatusAuthenticated, 
      whilleLoading,      
      loading,
      taskChangUpdate,
      taskChanged,
    }
  }
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };