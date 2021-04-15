import { withRouter } from "react-router-dom";
import { authorize } from "./Api";
import { useForm, Controller } from "react-hook-form";
import { Button, Typography, TextField } from "@material-ui/core";

function Login({ handleLogin, history }) {
  const { handleSubmit, formState: { errors }, control } = useForm();
  const onSubmit = data => {
    const {username, password} = data;
    return authorize(username, password)
      .then((data) => {
        if (data.auth_token) {
          handleLogin();
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h4">Войти</Typography>
        <Controller
          name="username"
          control={control}
          defaultValue=''
          rules={{ 
            required: {
              value: true,
              message: 'Обязательное поле'
            },
            minLength: {
              value: 2,
              message: 'Меньше 2 символов'
            },
            maxLength: {
              value: 15,
              message: 'Больше 15 символов'
            } 
          }}
          render={({ field }) => {
            return <TextField type="text" label="Username" variant="outlined" required fullWidth margin="normal" {...field}/>}}
        />
        {errors.username && <Typography variant="subtitle2" color="error" paragraph={true}>{errors.username.message}</Typography>}
        <Controller
          name="password"
          control={control}
          defaultValue=''
          rules={{ 
            required: {
              value: true,
              message: 'Обязательное поле'
            },
            minLength: {
              value: 2,
              message: 'Меньше 2 символов'
            },
            maxLength: {
              value: 15,
              message: 'Больше 15 символов'
            } 
          }}
          render={({ field }) => {
            return <TextField type="password" label="Password" variant="outlined" required fullWidth margin="normal" {...field} />}}
        />
        {errors.password && <Typography variant="subtitle2" color="error" paragraph={true}>{errors.password.message}</Typography>}
        <Button 
          type="submit" 
          size="large"
          fullWidth
          variant="contained"
          color="primary"
        >Войти</Button>
      </form>
  );
}

export default withRouter(Login);