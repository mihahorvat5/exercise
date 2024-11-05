import pytest
from data.database import get_connection, connection_pool
from exceptions import DatabaseNotConnectedException

def test_connection_pool_initialization():
    assert connection_pool is not None, "Connection pool should be initialized."

def test_get_connection():
    if connection_pool is not None:
        connection = get_connection()
        assert connection is not None
        connection.close()
    else:
        with pytest.raises(DatabaseNotConnectedException):
            get_connection()
