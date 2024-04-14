from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

# Create your models here.
class Event(models.Model):
    """Model definition for Event."""

    eventName = models.CharField(max_length=100)
    dateTime = models.DateTimeField()
    location = models.CharField(max_length=100)
    postedBy = models.ForeignKey(User, on_delete=models.CASCADE)
    coverPicture = models.ImageField(upload_to='cover')
    postedOn = models.DateTimeField(auto_now_add=True)
    likesCount = models.IntegerField(default=0)

    class Meta:
        """Meta definition for Event."""

        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        """Unicode representation of Event."""
        return self.eventName
    
class Like(models.Model):
    """Model definition for Like."""

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    likedUser = models.ForeignKey(User, on_delete=models.CASCADE)
    likedOn = models.DateTimeField(auto_now_add=True)

    class Meta:
        """Meta definition for Like."""

        verbose_name = 'Like'
        verbose_name_plural = 'Likes'

    def __str__(self):
        """Unicode representation of Like."""
        pass

@receiver(post_save, sender = Like)
def increaseLikeCount(sender, instance, **kwargs):
    eventObj = instance.event
    eventObj.likesCount += 1
    eventObj.save()

@receiver(post_delete, sender = Like)
def decreaseLikeCount(sender, instance, **kwargs):
    eventObj = instance.event
    eventObj.likesCount -= 1
    eventObj.save()
        
