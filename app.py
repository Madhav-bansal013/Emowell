import sys
import pandas as pd
import ast
import json
from sklearn import linear_model

data = pd.read_csv("dataset.csv")
array = data.values

for i in range(len(array)):
    if array[i][0] == "Male":
        array[i][0] = 1
    else:
        array[i][0] = 0

df = pd.DataFrame(array)

maindf = df[[0, 1, 2, 3, 4, 5, 6]]
mainarray = maindf.values

temp = df[7]
train_y = temp.values

for i in range(len(train_y)):
    train_y[i] = str(train_y[i])

mul_lr = linear_model.LogisticRegression(
    multi_class="multinomial", solver="newton-cg", max_iter=1000
)
mul_lr.fit(mainarray, train_y)


input_data_str = sys.argv[1]
inputdata = [json.loads(input_data_str)]

for i in range(len(inputdata)):
    if inputdata[i][0] == "Male":
        inputdata[i][0] = 1
    else:
        inputdata[i][0] = 0

df1 = pd.DataFrame(inputdata)
testdf = df1[[0, 1, 2, 3, 4, 5, 6]]
maintestarray = testdf.values

y_pred = mul_lr.predict(maintestarray)
for i in range(len(y_pred)):
    y_pred[i] = str(y_pred[i])

DF = pd.DataFrame(y_pred, columns=["Predicted Personality"])
DF.index = DF.index + 1
DF.index.names = ["Person No"]
# per = DF["Predicted Personality"].tolist()[0]
per = DF["Predicted Personality"].iloc[0]  # Corrected line
print(per)