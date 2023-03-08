import datetime
from django.utils.timezone import utc

def get(targetTime):
    currentTime = datetime.datetime.utcnow().replace(tzinfo=utc)
    timeDiff = currentTime - targetTime
    timeDiffSeconds = timeDiff.total_seconds()
    humanTimeDifference = ""

    # 60 (min), 3600 (hour), 86400 (day), 604800 (week), 2592000 (month), 31536000 (year)

    if (timeDiffSeconds > 31536000):
        humanTimeDifference = str(round(timeDiffSeconds/31536000)) + " year"
    elif (timeDiffSeconds > 2592000):
        humanTimeDifference = str(round(timeDiffSeconds/2592000)) + " month"
    elif (timeDiffSeconds > 604800):
        humanTimeDifference = str(round(timeDiffSeconds/604800)) + " week"
    elif (timeDiffSeconds > 86400):
        humanTimeDifference = str(round(timeDiffSeconds/86400)) + " day"
    elif (timeDiffSeconds > 3600):
        humanTimeDifference = str(round(timeDiffSeconds/3600)) + " hour"
    elif (timeDiffSeconds > 60):
        humanTimeDifference = str(round(timeDiffSeconds/60)) + " minute"
    else:
        humanTimeDifference = str(round(timeDiffSeconds)) + " second"

    numDiff = int(humanTimeDifference.split(' ')[0])
    if numDiff > 1:
        humanTimeDifference+="s"

    return humanTimeDifference