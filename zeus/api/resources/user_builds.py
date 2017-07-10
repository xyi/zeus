from sqlalchemy.orm import joinedload, subqueryload_all

from zeus import auth
from zeus.config import db
from zeus.models import Author, Build, User

from .base import Resource
from ..schemas import BuildSchema

builds_schema = BuildSchema(many=True, strict=True)


class UserBuildsResource(Resource):
    def get(self, user_id):
        """
        Return a list of builds for the given user.
        """
        if user_id == 'me':
            user = auth.get_current_user()
        else:
            user = User.query.get(user_id)

        query = Build.query.options(
            joinedload('source').joinedload('revision'),
            joinedload('author'),
            subqueryload_all('stats'),
        ).filter(
            Build.author_id.in_(db.session.query(Author.id).filter(Author.email == user.email))
        ).order_by(Build.number.desc()).limit(100)
        return self.respond_with_schema(builds_schema, query)
