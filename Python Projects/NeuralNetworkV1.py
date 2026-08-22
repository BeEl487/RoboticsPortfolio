import numpy as np
import random

class Layer:
    def __init__(self, num_inputs, num_outputs):
        self.num_inputs = num_inputs
        self.num_outputs = num_outputs
        
        self.weights = np.random.uniform(-0.5,0.5,(num_inputs, num_outputs))
        self.biases = np.random.uniform(-0.5,0.5, num_outputs)

    def forward(self, inputs):
        return np.dot(inputs, self.weights)+self.biases


class Network:
    def __init__(self, layers):
        self.layers = []
        for i in range(len(layers)-1):
            l = Layer(layers[i], layers[i+1])
            self.layers.append(l)

        self.learningRate = 0.3

    def sig(self,x):
        return 1/(1+np.exp(-x))

    def sigmoid(self,x):
        output = []
        for i in range(len(x)):
            output.append(self.sig(x[i]))

        return output
            
    def forward(self, inputs):
        outputs = inputs
        
        for l in self.layers:
            
            outputs = self.sigmoid(l.forward(outputs))
            
        return outputs
    
    def cost(self, expected_outputs, outputs):
        return sum([(a - b) * (a - b) for a,b in zip(outputs, expected_outputs)])
    
    def gradient_decent(self, inputs, expected_outputs):
        
        for l in self.layers:
            slopeWeights = np.random.uniform(1.0,1.0,(l.num_inputs, l.num_outputs))
            slopeBiases = np.random.uniform(1,1, l.num_outputs)
            
        
            cost = self.cost(expected_outputs, self.forward(inputs))
            
        
            h = 0.0001
            for weight_x in range(len(l.weights)):
                for weight_y in range(len(l.weights[0])):
                
                    l.weights[weight_x][weight_y] += h
                    newCost = self.cost(expected_outputs, self.forward(inputs))
                    delta =  newCost-cost
                    slope = delta/h
                    
                    slopeWeights[weight_x][weight_y] = slope*self.learningRate
                    l.weights[weight_x][weight_y] -= h
    
            for bias in range(len(l.biases)):
            
                
                    l.biases[bias] += h
                    newCost = self.cost(expected_outputs, self.forward(inputs))
                    delta =  newCost-cost
                    slope = delta/h
                    
                    slopeBiases[bias] = slope*self.learningRate
                    l.biases[bias] -= h

            l.weights-=slopeWeights
            l.biases-=slopeBiases
            
                
net = Network([2,5,1])

training_data = [[0,0],[0,1],[1,0],[1,1]]
training_answers = [[0],[0],[0],[1]]

print("Training")
for i in range(5000):
    idx = random.randint(0,3)
    
    net.gradient_decent(training_data[idx], training_answers[idx])
    if random.randint(0,30) == 1:
        print("Itteration: ", i)

print("Training Complete")


while True:
    idx = int(input("What sample: "))

    print("Sample: ", training_data[idx])
    print("Answer: ", training_answers[idx])
    print("\n")
    net.gradient_decent(training_data[idx], training_answers[idx])

    
    print("Output: ", net.forward(training_data[idx]))
    print("Correct Output: ", training_answers[idx])
    print("\n\n")
