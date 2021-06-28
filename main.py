from flask import Flask, request, render_template
app = Flask(__name__)
import os
import json

from imageai.Detection import ObjectDetection

execution_path = os.getcwd()

detector = ObjectDetection()
detector.setModelTypeAsRetinaNet()
detector.setModelPath( os.path.join(execution_path , "resnet50_coco_best_v2.0.1.h5"))
detector.loadModel()


# folderNames = []
# basePath = "./data"

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/verify', methods=['POST'])
def verify():

    try:
        file = request.files['attachments']
        filePath = './data/'+file.filename
        file.save(filePath)

        detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path, filePath),
                                                     output_image_path=os.path.join(execution_path, './data/processed'+file.filename))

        output = []


        for eachObject in detections:
            dic = {}
            dic[eachObject["name"]] = eachObject["percentage_probability"]
            output.append(dic)

        return json.dumps(output)

    finally:
        return json.dumps(output)




# main driver function
if __name__ == '__main__':
    # run() method of Flask class runs the application
    # on the local development server.
    app.run(host='0.0.0.0', port=4000)
    # app.run()