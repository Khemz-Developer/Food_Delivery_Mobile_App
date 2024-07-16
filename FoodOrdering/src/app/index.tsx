import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
  const {session,loading,isAdmin} = useAuth();

  if(loading){
    return <ActivityIndicator />
  }
  
  if(!session){
    return <Redirect href={"/sign-in"} />
  }

  if(!isAdmin){
    return <Redirect href={"/(user)"} />
  }

  
  

  const SignOut = async () => {
    await supabase.auth.signOut();
    console.warn('Signed out');
  };
   
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
     
      <Button text="Sign out" onPress={SignOut} />

    </View>
  );
};

export default index;