from flask import Flask, request, jsonify
import spacy

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    sentence = data.get('sentence', '')

    if not sentence:
        return jsonify({'response': 'Invalid input'})

    # Extract main word (noun or verb)
    doc = nlp(sentence)
    main_word = None
    for token in doc:
        if token.pos_ in ["VERB", "NOUN"]:  # Check for main verbs or nouns
            main_word = token.lemma_  # Return the root form
            break

    return jsonify({'response': main_word or 'unknown'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
