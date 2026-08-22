import matplotlib.pyplot as plt
import numpy as np
import NeuralNetworkV1Usable as Nnet
import random


def f(x):
    return np.sin(x*2)



t = np.arange(3.0, 5.0, 0.01)

plt.ion()

fig = plt.figure()
ax = fig.add_subplot()
line1, = ax.plot(t,f(t))


line2, = ax.plot(t,f(t))




net = Nnet.Network([1,16,1], 0.03)

for i in range(7000):
    for a in range(len(t)):
        net.gradient_decent([t[a]], [f(t[a]) ])

    
    
        if random.randint(0,70) == 1:
            test = []
        
        
            for d in range(len(t)):
            
                test.append(net.forward([t[d]])[0])

        
            line1.set_ydata(test)
            fig.canvas.draw()
            fig.canvas.flush_events()
        

        

        

    


