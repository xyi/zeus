import json

from zeus.testutils import assert_json_response


def test_anonymous(client):
    r = client.get('/api/0/auth/')
    resp = client.get('/api/0/auth/')
    assert resp.status_code == 200
    assert_json_response(resp)
    data = json.loads(resp.data)
    assert data == {'authenticated': False}


def test_authenticated(client, default_login):
    resp = client.get('/api/0/auth/')
    assert resp.status_code == 200
    assert_json_response(resp)
    data = json.loads(resp.data)
    assert data['authenticated'] is True
    assert data['user']['id'] == self.default_user.id.hex
