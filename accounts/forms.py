from .models import User
from django.contrib.auth.forms import UserCreationForm
class SignUpForm(UserCreationForm):
#profile_year        = blaaa blaa blaaa irrelevant.. You have your own stuff here don't worry about it
   # here is the important part.. add a class Meta-
   class Meta:
      model = User #this is the "YourCustomUser" that you imported at the top of the file  
      fields = ('username', 'password1', 'password2')

class Login(UserCreationForm):
#profile_year        = blaaa blaa blaaa irrelevant.. You have your own stuff here don't worry about it
   # here is the important part.. add a class Meta-
   class Meta:
      model = User #this is the "YourCustomUser" that you imported at the top of the file  
      fields = ('username', 'password1')     