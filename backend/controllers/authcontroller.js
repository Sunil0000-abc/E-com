const User = require('../model/auth');

const sendMail = require('../utils/sendmail');

exports.signup = async (req, res) =>{
    const {name ,email , password  } = req.body ;

    try{
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exist"});
        }

        const newUser = await User.create({name, email, password});

        res.status(200).json({message:"User resistered sucessesfully"});


    }catch(err){
        res.status(500).json({message: 'Signup failed', error: err.message});
    }
}



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

   
    return res.status(200).json({
      message: 'Login successful',
      user: { name:user.name, email: user.email}
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};




exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();

    
    await sendMail(email, 'Your OTP Code', `Your OTP is ${otp}`);

    
    res.status(200).json({ message: 'OTP sent to email' });

  } catch (err) {
    console.error('Forgot Password Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = newPassword; 
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
