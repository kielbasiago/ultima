SEED_LENGTH = 12

def generate_seed():
    import secrets, string
    alpha_digits = string.ascii_lowercase + string.digits
    return ''.join(secrets.choice(alpha_digits) for i in range(SEED_LENGTH))

if __name__ == "__main__":
    print(generate_seed())
