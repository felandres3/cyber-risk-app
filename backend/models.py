class Result:
    """Clase para manejar el resultado de operaciones con éxito o error."""

    def __init__(self, success, value=None, error=None):
        """Inicializa un resultado con estado de éxito o error."""
        self.success = success
        self.value = value
        self.error = error

    @staticmethod
    def success(value):
        """Crea una instancia de Result representando éxito."""
        return Result(True, value=value)

    @staticmethod
    def failure(error):
        """Crea una instancia de Result representando fallo."""
        return Result(False, error=error)