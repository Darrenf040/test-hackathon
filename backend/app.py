from flask import Flask
from database import db, init_db
from routes import api
from flask_cors import CORS
from flask_migrate import Migrate



def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_SORT_KEYS'] = False
    
    # Initialize database
    init_db(app)

    migrate = Migrate(app, db)  # <-- Add this

    
    # Register blueprints
    app.register_blueprint(api, url_prefix='/api')
    
    @app.route('/')
    def home():
        return {
            'message': 'Welcome to the API',
            'endpoints': {
                'users': '/api/users',
                'products': '/api/products',
                'user_products': '/api/users/<user_id>/products'
            }
        }
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
