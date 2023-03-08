from django.core.mail import send_mail
from django.template.loader import render_to_string
from base.enums import Utilities
from django.utils.html import strip_tags

def userRegistered(username, to):
    html_message = render_to_string('user-registered.html', {'username': username})
    text_content = strip_tags(html_message)
    send_mail(
        'Welcome to Ribbit',
        text_content,
        Utilities.get.DEFAULT_APP_NAME.value,
        [to],
        fail_silently=False,
        html_message=html_message
    )

def resetPasswordEmailSent(url, to):
    html_message = render_to_string('reset-password-email.html', {'url': url})
    text_content = strip_tags(html_message)
    send_mail(
        'Reset Password',
        text_content,
        Utilities.get.DEFAULT_APP_NAME.value,
        [to],
        fail_silently=False,
        html_message=html_message
    )