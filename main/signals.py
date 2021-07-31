from django.db.models.signals import post_save
from .models import UserProfile
from django.dispatch import receiver
from teachers.models import Student, Teacher
import pdb


@receiver(post_save, sender=UserProfile)
def create_profile(sender, instance, created, **kwargs):
    # pdb.set_trace()
    if created:
        if instance.is_teacher:
            Teacher.objects.create(user=instance)
