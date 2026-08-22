import random
import numpy as np
import copy

class Layer:
    def __init__(self, numInputs, numOutputs):
        self.weights = np.zeros((numOutputs, numInputs))
        self.biases = np.zeros(numOutputs)
        
        self.randomizeLayer()


    def forward(self,inputs):
        # Return dot product
        return self.sigmoidM(np.dot(self.weights, inputs)+self.biases)



    def randomizeWeights(self):
        # For every neuron with weights connecting from it
        for neuron in range(len(self.weights)):
            # For every weight in the layer
            for weight in range(len(self.weights[neuron])):
                self.weights[neuron, weight] = random.uniform(-0.5, 0.5)



    def randomizeBiases(self):
        # For every bias in layer
        for bias in range(len(self.biases)):
            self.biases[bias] = random.uniform(-0.5, 0.5)



    def randomizeLayer(self):
        self.randomizeWeights()
        self.randomizeBiases()

    def sigmoid(self, x):
        return 1.0/(1.0+np.exp(-x))


    def sigmoidM(self,array):
        # Runs the sigmoid function through a array
        for i in range(len(array)):
            array[i] = self.sigmoid(array[i])
        return array

    def modifyArray(self,a):
        for i in range(len(a)):
            if random.random() < 0.6:
                a[i] += np.random.random_sample() - 0.5

        return a

    def modifyLayer(self):
        self.biases = copy.deepcopy(self.modifyArray(self.biases))
        self.weights = copy.deepcopy(self.modifyArray(self.weights))



class Network:
    def __init__(self, numInputs, numOutput):
        self.layerInputs = Layer(numInputs,numOutput)
        
        self.outputs = 0
        self.networkCost = 10000000
        self.learnRate = 1
        print(self.layerInputs.weights)

        print(self.layerInputs.biases)


    def forward(self, inputs, correctOutputs):
        outputs1 = self.layerInputs.forward(inputs)

        self.outputs = outputs1[0]#= self.decision(outputs2)
        self.networkCost = self.cost(self.outputs, correctOutputs)
        #print(self.networkCost)

    def decent(self, inputs, correctOutputs):
        
        newLIW = copy.deepcopy(self.layerInputs.weights)
        newLIB = copy.deepcopy(self.layerInputs.biases)


        
        self.forward(inputs, correctOutputs)
        oldCost = self.networkCost
        h = 0.01
        for r in range(len(self.layerInputs.weights)):
            for w in range(len(self.layerInputs.weights[r])):
                self.layerInputs.weights[r][w] += h
                self.forward(inputs, correctOutputs)
                newLIW[r][w] = (oldCost-self.networkCost)*self.learnRate
                self.layerInputs.weights[r][w] -= h
                
    

        #for r in range(len(self.layerInputs.biases)):
        for b in range(len(self.layerInputs.biases)):
            self.layerInputs.weights[b] += h
            self.forward(inputs, correctOutputs)
            newLIB[b] = (oldCost-self.networkCost)*self.learnRate
            self.layerInputs.biases[b] -= h

        self.layerInputs.weights += newLIW
        self.layerInputs.biases += newLIB
        print(self.layerInputs.weights)
        print(self.layerInputs.biases)
        print("CHANGE: ", newLIW)
        
        self.test(inputs, correctOutputs)

    def test(self, inputs, correctOutputs):
        self.forward(inputs, correctOutputs)
        
        print("Outputs: " + str(self.outputs) + "   Correct Outputs: " + str(correctOutputs) + "   Cost: " + str(self.networkCost))

    

            
        

    def batch(self, inputsT, outputsT):
        cost = 0

        
            
        for i in range(len(inputsT)):
            self.forward(inputsT[i], outputsT[i])
            cost+=self.networkCost
            #print(inputsT[s])

        self.networkCost = cost/len(inputsT)
    
    

    def cost(self, outputs, correctOutputs):
        
        return abs(correctOutputs - outputs)#*abs(correctOutputs - outputs)
        
    

net = Network(1, 1)

inputsT = [[0],[1]]#,[0,1],[1,1]]

outputsT = [[2], [2]]#,[1],[0],[1]]


for i in range(1000):
    j = i%2
    net.decent(inputsT[j], outputsT[j])
    



print("Training Complete")
print(" ")
print(" ")



#N = int(input("Choose Network (0 - " + str(num-1) + "): "))

while True:
    print("Inputs: " + str(inputsT))
    print("Outputs: " + str(outputsT))
    print(" ")
    print(" ")

    
    i = input("Give Input Index: ")
    i = int(i)

    print(" ")
    print(" ")

    
    net.test(inputsT[i], outputsT[i])

    
    print(" ")
    print(" ")
    print(" ")










class Networks:
    def __init__(self, numInputs, numHidden, numOutputs, numNetworks):
        self.networks = []
        self.numNetworks = numNetworks
        
        for i in range(numNetworks):
            n = Network(numInputs, numHidden, numOutputs)
            self.networks.append(n)

        


    def forward(self, inputs, correctOutputs):
        print(correctOutputs)
        for n in range(len(self.networks)):
            self.networks[n].networkCost = self.networks[n].forward(inputs, correctOutputs)

        self.networks = sort(self.networks)
        if self.networks[-1].networkCost < self.networks[0].networkCost:
            print("plqaewhuiewfqgyowfhufwyu")
            exit()
##        for network in range(10):
##            self.networks[network+10]= copy.deepcopy(self.networks[network])
##            self.networks[network+10].modifyWeights()

##        for network in self.networks[-20:-1]:
##            network.modifyWeights()
##            
        for network in self.networks[-3:-1]:
            network.modifyWeights()
        
        #[round(round(len(self.networks))/2+round(len(self.networks))/4):-1]
        
        

        
                    
        
        
        
        #print("Best Network: "+str(self.networks[0].networkCost), "    Worst Network: "+str(self.networks[-1].networkCost))

        
        #print("Output: " + str(self.networks[0].outputs) + "  Correct Outputs: " + str(correctOutputs) + "   Cost: " + str(self.networks[0].networkCost))
        self.test(inputs, correctOutputs)
        if self.networks[0].networkCost < 0.000001:
            print("---------------------------------------------------------------------------")

    def modifyNetworks():
        pass
        
    def test(self, inputs, correctOutputs):
        self.networks = sort(self.networks)
        self.networks[0].forward(inputs, correctOutputs)
        
        print("Outputs: " + str(self.networks[0].outputs) + "   Correct Outputs: " + str(correctOutputs) + "   Cost: " + str(self.networks[0].networkCost))
    

##class Networks:
##    def __init__(self, numInputs, numHidden, numOutputs, numNetworks):
##        self.networks = []
##        self.numNetworks = numNetworks
##        
##        for i in range(2):
##            n = Network(numInputs, numHidden, numOutputs)
##            self.networks.append(n)
##
##        
##
##
##    def forward(self, inputs, correctOutputs):
##        
##        
##        for network in self.networks:
##            network.forward(inputs, correctOutputs)
##
##        self.networks = sort(self.networks)
##
####        for network in range(10):
####            self.networks[network+10]= copy.deepcopy(self.networks[network])
####            self.networks[network+10].modifyWeights()
##            
##        
##        self.networks[0].modifyWeights()
##        
##        #[round(round(len(self.networks))/2+round(len(self.networks))/4):-1]
##        
##        
##
##        
##                    
##        
##        
##        
##        
##        #print("Best Network: "+str(self.networks[0].networkCost), "    Worst Network: "+str(self.networks[-1].networkCost))
##
##        
##        print("Output: " + str(self.networks[0].outputs) + "  Correct Outputs: " + str(correctOutputs))
##        
##        if abs(self.networks[0].outputs - correctOutputs) > 0.000001:
##            print("---------------------------------------------------------------------------")

        
            
##defult = True
##print("----Neural Network----")
##print(" ")
##h = 10
##num = 3
##epochs = 1000
##if not defult:
##    h = int(input("Hidden Layers: "))
##    num = int(input("Number of Networks: "))
##    epochs = int(input("Number OF Epochs (Adverage is 500): "))
##
##print(" ")
##print(" ")
##print("...Initializing Networks...")
##print(" ")
##print("Commencing Training On Data")
##print(" ")
##print(" ")
##
##
##n = Networks(2,h,1, num)
##
##inputsT = [[1,1], [0,0]]
##
##outputsT = [[1],[0]]
##
##
##for i in range(epochs):
##    randomIndex = random.randint(0,1)
##    
##    n.forward(inputsT[randomIndex],outputsT[randomIndex])
##
##
##
##
##
##
##
##print(n.networks[0].layerInputs.weights)
##print("Training Complete")
##print(" ")
##print(" ")
##
##
##
###N = int(input("Choose Network (0 - " + str(num-1) + "): "))
##
##while True:
##    print("Inputs: " + str(inputsT))
##    print("Outputs: " + str(outputsT))
##    print(" ")
##    print(" ")
##
##    
##    i = int(input("Give Input Index: "))
##
##
##    print(" ")
##    print(" ")
##
##    
##    n.test(inputsT[i], outputsT[i])
##
##    
##    print(" ")
##    print(" ")
##    print(" ")
##    
##ri = random.randint(0,len(outputsT)-1)
##print(str(inputsT[ri]) + "   " + str(outputsT[ri]))
##
##n.networks[0].forward(inputsT[ri], outputsT[ri])
##print(n.networks[0].outputs)
