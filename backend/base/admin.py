from django.contrib import admin
from .models import Post, Comment, UserProfile, Subribbit
# Register your models here.

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(UserProfile)
admin.site.register(Subribbit)
