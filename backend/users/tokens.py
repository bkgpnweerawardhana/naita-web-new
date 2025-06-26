#this file is for creating tokens for account password reset process
from django.contrib.auth.tokens import PasswordResetTokenGenerator
# six is no longer needed; use str instead

class PasswordResetTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        # Only include fields that don't change after password reset
        return (
            str(user.pk) + str(timestamp) + 
            str(user.is_active) + str(user.is_verified)  # Don't include password hash
        )

password_reset_token = PasswordResetTokenGenerator()

class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            str(user.pk) + str(timestamp) +
            str(user.is_active) + str(user.is_verified)
        )

account_activation_token = AccountActivationTokenGenerator()