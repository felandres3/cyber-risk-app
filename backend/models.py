class Result:
    def __init__(self, success, value=None, error=None):
        self.success = success
        self.value = value
        self.error = error

    @staticmethod
    def success(value):
        return Result(True, value=value)

    @staticmethod
    def failure(error):
        return Result(False, error=error)