-- ============================================================
-- Personal Tech — Seed: Common Exercises
-- ============================================================
-- Popular exercises seeded from ExerciseDB categories.
-- These serve as the initial library; the Edge Function
-- can add more from the API on demand.
-- ============================================================

INSERT INTO exercises (name, muscle_group, category, equipment, is_custom) VALUES
-- Peito
('Supino Reto com Barra',        'Peitoral Maior, Tríceps',      'Peito',  'Barra',    false),
('Supino Inclinado com Halteres', 'Peitoral Superior, Tríceps',   'Peito',  'Halteres', false),
('Crucifixo com Halteres',       'Peitoral',                      'Peito',  'Halteres', false),
('Crucifixo Inclinado',          'Peitoral Superior',             'Peito',  'Halteres', false),
('Crossover',                    'Peitoral',                      'Peito',  'Cabo',     false),
('Flexão de Braços',             'Peitoral, Tríceps, Core',       'Peito',  'Peso Corporal', false),

-- Costas
('Puxada Alta Frontal',          'Dorsais, Bíceps',               'Costas', 'Cabo',     false),
('Remada Curvada',               'Dorsais, Trapézio',             'Costas', 'Barra',    false),
('Remada Unilateral',            'Dorsais, Romboides',            'Costas', 'Halteres', false),
('Pulldown',                     'Dorsais',                       'Costas', 'Cabo',     false),
('Barra Fixa',                   'Dorsais, Bíceps',               'Costas', 'Peso Corporal', false),

-- Pernas
('Agachamento Livre',            'Quadríceps, Glúteos',           'Pernas', 'Barra',    false),
('Leg Press 45°',                'Quadríceps',                    'Pernas', 'Máquina',  false),
('Cadeira Extensora',            'Quadríceps',                    'Pernas', 'Máquina',  false),
('Cadeira Flexora',              'Isquiotibiais',                 'Pernas', 'Máquina',  false),
('Stiff',                        'Isquiotibiais, Glúteos',        'Pernas', 'Barra',    false),
('Panturrilha em Pé',            'Panturrilha',                   'Pernas', 'Máquina',  false),
('Agachamento Búlgaro',          'Quadríceps, Glúteos',           'Pernas', 'Halteres', false),

-- Ombros
('Desenvolvimento com Barra',    'Deltoide Anterior, Lateral',    'Ombros', 'Barra',    false),
('Desenvolvimento com Halteres', 'Deltoide Anterior',             'Ombros', 'Halteres', false),
('Elevação Lateral',             'Deltoide Lateral',              'Ombros', 'Halteres', false),
('Elevação Frontal',             'Deltoide Anterior',             'Ombros', 'Halteres', false),
('Face Pull',                    'Deltoide Posterior, Trapézio',  'Ombros', 'Cabo',     false),

-- Braços
('Rosca Direta',                 'Bíceps',                        'Braços', 'Barra',    false),
('Rosca Alternada',              'Bíceps',                        'Braços', 'Halteres', false),
('Rosca Martelo',                'Bíceps, Braquial',              'Braços', 'Halteres', false),
('Tríceps Corda',                'Tríceps',                       'Braços', 'Cabo',     false),
('Tríceps Testa',                'Tríceps',                       'Braços', 'Barra EZ', false),
('Extensão de Tríceps',          'Tríceps',                       'Braços', 'Cabo',     false),

-- Core
('Prancha',                      'Core, Abdômen',                 'Core',   'Peso Corporal', false),
('Abdominal Crunch',             'Reto Abdominal',                'Core',   'Peso Corporal', false),
('Abdominal Infra',              'Reto Abdominal Inferior',       'Core',   'Peso Corporal', false),
('Russian Twist',                'Oblíquos',                      'Core',   'Peso Corporal', false),

-- Cardio
('Esteira',                      'Cardiovascular',                'Cardio', 'Esteira',  false),
('Bicicleta Ergométrica',        'Cardiovascular, Quadríceps',    'Cardio', 'Bicicleta',false),
('Elíptico',                     'Cardiovascular, Full Body',     'Cardio', 'Elíptico', false),
('Pular Corda',                  'Cardiovascular, Panturrilha',   'Cardio', 'Corda',    false)

ON CONFLICT DO NOTHING;
