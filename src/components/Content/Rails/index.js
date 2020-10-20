import {rails} from '../Axios'

const railsPost = (authUser) => {
  const {uid, email, displayName, photoURL, phoneNumber } = authUser 

  rails.post('/users', {
      uid: authUser.uid,
      name: authUser.displayName,
      email: authUser.email,
      phone_number: authUser.phoneNumber,
      photoURL: authUser.photoURL,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

};

export default railsPost;