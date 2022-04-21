from locust import HttpUser, task, between
import random
class WebsiteUser(HttpUser):
    wait_time = between(3,4)

    @task(1)
    def index(self) :
        self.client.get("/")