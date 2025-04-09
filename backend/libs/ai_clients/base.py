from abc import ABC, abstractmethod

class BaseAIClient(ABC):
    @abstractmethod
    def stream_response(self, user_question: str):
        pass
