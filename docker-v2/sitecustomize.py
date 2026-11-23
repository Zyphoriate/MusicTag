import os
if os.environ.get('MTW_LOCAL_TEST_LICENSE') == '1':
    import local_license_runtime
