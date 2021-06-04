from django.contrib.auth.models import Group
from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import UserProfile

import pdb


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "id",
            "firstname",
            "lastname",
            "email",
            "is_student",
            "is_teacher",
            "is_manager",
            "is_active",
            "birthdate",
            "phone_number",
            "created_at",
            "updated_at",
            "profile_pic"
        ]


# --------------------------------------------------


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        
        print(validated_data)
        user = UserProfile.objects.create_user(
            validated_data["email"], validated_data["password"],
        )
        instance, created = UserProfile.objects.update_or_create(
            email=validated_data["email"],
            defaults={
                "is_manager": validated_data["is_manager"],
                "is_student": validated_data["is_student"],
                "is_teacher": validated_data["is_teacher"],
                "firstname": validated_data["firstname"],
                "lastname": validated_data["lastname"],
                "birthdate": validated_data["birthdate"],
                "phone_number": validated_data["phone_number"],
            },
        )

        # Returning the updated user
        return instance


# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")



class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model=UserProfile
        fields=['firstname',"lastname","email","phone_number"]

    # def save(self, **kwargs):
    #     validated_data=self.validated_data
        