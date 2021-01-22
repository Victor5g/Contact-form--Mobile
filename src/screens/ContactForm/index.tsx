import React,{useState,useCallback} from 'react';

import api from '../../services/Api'

//StyledComponents
import { 
   ContainerForm,
   Input, 
   Txt, 
   Form, 
   TextArea, 
   Button, 
   TextButton,
   TxtError
} from './styles';


export default function ContactForm(){

//data Form
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [subjectMatter, setSubjectMatter] = useState('')
const [message, setMessage] = useState('');

//data-API
const service_id = 'service_dsti3df';
const template_id = 'template_drvc21v';
const user_id = 'user_OJgy7ahiLcgnyQIuW5vUq';
const template_params = { name, email, message, subjectMatter };

//Animations
const [EmptyField, setEmptyField] = useState(false);
const [loading, setLoading] = useState(false);

//Function-send-E-mail
const handleSendEmail = useCallback(async () => {

  try{

  if(name && email && subjectMatter && message !==''){
    
    setLoading(true);
    setEmptyField(false);

    const data ={
      user_id,
      service_id,
      template_id,
      template_params
   }
     
     const response = await api.post('/send',data);

     if(response.status === 200){
      alert('✅Enviado Com sucesso ✅');
      return;

     }else{
      alert('❌ERROR❌');
      return;
    }
  }
  
  setEmptyField(true);
  return;

  }catch(erro){
    
   console.log(' ❌Erro: ',erro,'❌');
    alert('❌Error no Envio dos dados \n, por favor tente mais tarde...❌');
  }finally {
    setLoading(false);
  }
}, [user_id, service_id, template_id, template_params]);

  return(
    <ContainerForm>
      <Form>
      <Txt>Contact US</Txt>
      {EmptyField && (
          <TxtError>Preencha todos os campos</TxtError>
        )}

        <Input 
          placeholder="Name"  
          onChangeText={setName}
          autoCorrect={false}
          autoCapitalize="none"
        />

        <Input
          placeholder="E-mail"
          type="email"
          autoCorrect={false}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Input 
        placeholder="SubjectMatter"
        onChangeText={setSubjectMatter}
        />
        
        <TextArea 
        placeholder="Messsage" 
        onChangeText = {setMessage}
        multiline={true} 
        numberOfLines={30}
        />

        <Button loading={loading} onPress={handleSendEmail} >
        <TextButton>{loading ? '....' : 'send'}</TextButton>  
        </Button>

      </Form>
    </ContainerForm>
    
  );
}