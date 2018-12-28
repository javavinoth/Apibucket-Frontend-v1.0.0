function required() {
    
    var name=document.forms["login-form"]["userName"].value;
    if(name=="")
    {
        alert('email should not be empty');
        return false;
    }
    return true;
}