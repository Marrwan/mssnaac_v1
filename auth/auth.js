module.exports = {
    isLoggedIn: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'You have to log in to view that');
        res.redirect('/login')
    },
    isAdmin : function(req,res,next){
        if(req.isAuthenticated() && req.user.userType == 'admin'){
            return next();
        }
        req.flash('error_msg', 'Sorry, this is available only  for the admin');
        res.redirect('/login')
    },
    isStudent: function(req,res,next){
        if(req.isAuthenticated() && req.user.userType == 'student' ){
            return next();
        }
        req.flash('error_msg', 'Sorry, this  is only available for the students');
        res.redirect('/')
    }
}