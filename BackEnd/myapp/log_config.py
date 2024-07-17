# log_config.py
import logging
import sys

def setup_logging():
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('views.log'),
            logging.StreamHandler(sys.stderr)
        ]
    )