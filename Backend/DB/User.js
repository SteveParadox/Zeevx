import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    picture: {
      type: String,
      required: false,
    },
    emailVerified: {
      type: Boolean,
      default: false, 
    },
    // Add more fields as needed
  });


/*  // Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};
*/



export default mongoose.model('User', userSchema);

