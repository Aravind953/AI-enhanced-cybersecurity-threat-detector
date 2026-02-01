import numpy as np
from sklearn.ensemble import IsolationForest

# Simple feature extraction
def extract_features(log):
    """
    Convert a log into numeric features
    """
    level_map = {
        "INFO": 0,
        "WARN": 1,
        "ERROR": 2
    }

    return np.array([
        level_map.get(log.get("level", "INFO"), 0),
        len(log.get("message", "")),
    ]).reshape(1, -1)


class AnomalyModel:
    def __init__(self):
        self.model = IsolationForest(
            n_estimators=100,
            contamination=0.1,
            random_state=42
        )
        self.is_trained = False

    def train(self):
        """
        Train on synthetic 'normal' behavior
        """
        normal_data = np.array([
            [0, 20],
            [0, 30],
            [1, 40],
            [0, 25],
            [1, 35],
        ])
        self.model.fit(normal_data)
        self.is_trained = True

    def score(self, log):
        if not self.is_trained:
            self.train()

        features = extract_features(log)
        score = -self.model.decision_function(features)[0]

        return round(float(score), 3)


anomaly_model = AnomalyModel()
