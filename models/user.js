import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    mail: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      //unique: true,
      required: true,
    },
  },
  //createdAt and updatedAt fields.
  { timestamps: true },
);
 
userSchema.statics.findByLogin = async function (emailOrName, pass) {
    let user = await this.findOne({
      mail: emailOrName,
      password: pass,
    });
   
    /*if (!user) {
      user = await this.findOne({ 
        username: emailOrName,
        password: pass, 
      });
    }*/
   
    return user;
  };

//we add a pre hook to our user schema to remove all messages of this user on its deletiondeleting his msgs when the user is deleted
userSchema.pre('remove', function(next) {
    this.model('Task').deleteMany({ user: this._id }, next);
  });

const User = mongoose.model('User', userSchema);
 
export default User;