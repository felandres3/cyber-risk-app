-- Crate table
CREATE TABLE
    risks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        impact INTEGER NOT NULL CHECK (
            impact >= 1
            AND impact <= 5
        ),
        probability INTEGER NOT NULL CHECK (
            probability >= 1
            AND probability <= 5
        ),
        category VARCHAR(50),
        status VARCHAR(20) NOT NULL
    );
    

-- Insert data
INSERT INTO
    risks (
        title,
        description,
        impact,
        probability,
        category,
        status
    )
VALUES
    (
        'Acceso no autorizado a datos de identidad',
        'Posible acceso no autorizado a información de identidad de clientes por vulnerabilidades en el sistema de autenticación',
        4,
        3,
        'Seguridad de acceso',
        'Activo'
    ),
    (
        'Pérdida de datos por phishing',
        'Correos falsos roban credenciales de identidad',
        3,
        4,
        'Fraude',
        'Activo'
    ),
    (
        'Ataque DDoS',
        'Servidores caen por tráfico malicioso',
        5,
        1,
        'Infraestructura',
        'Activo'
    ),
    (
        'Fuga de identidad interna',
        'Empleado expone datos sensibles',
        2,
        3,
        'Seguridad interna',
        'Activo'
    );