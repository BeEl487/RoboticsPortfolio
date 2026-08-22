from PIL import Image
import math
import random
import multiprocessing
import time
from numba import jit, cuda
from numba.experimental import jitclass


im = Image.new(mode = "RGB", size = (500,300), color = (0,0,0))

maxRayDepth = 10000

pixels = im.load()

width = im.size[0]
height = im.size[1]

aspectRatio = width/height

startEmmisive = 0
        

@jit
def randomUnitVector():
    z = random.uniform(0,1) * 2 - 1
    a = random.uniform(0,1) * math.pi*2
    r = math.sqrt(1 - z*z)
    x = r * math.cos(a)
    y = r * math.sin(a)

    return (x,y,z)
@jit
def lerp(a,b,t):
    return a + (b-a) * t
@jit
def lerpTupleByValue(a,b,t):
    return (lerp(a[0], b[0], t),lerp(a[1], b[1], t),lerp(a[2], b[2], t))
@jit
def tupleDot(x,y):
    return (x[0] * y[0] + x[1] * y[1] + x[2] * y[2])
@jit
def normalize(x):
    mag = math.sqrt(pow(x[0],2)+pow(x[1],2)+pow(x[2],2))
    return (x[0] / mag, x[1] / mag, x[2] / mag)
@jit
def minusTuple(x, y):
    return (x[0] -y[0], x[1] - y[1], x[2] - y[2])
@jit
def addTuple(x, y):
    return (x[0] +y[0], x[1] + y[1], x[2] + y[2])
@jit
def multiplyTupleByValue(x, t):
    return (x[0] * t, x[1] * t, x[2] * t)
@jit
def tupleToInt(t):
    return ((int)(t[0]),(int)(t[1]),(int)(t[2]))
@jit
def multiplyTuple(x,y):
    return (x[0]*y[0],x[1]*y[1],x[2]*y[2])

@jit
def divideTupleByValue(x, t):
    return (x[0] / t, x[1] / t, x[2] / t)


@jit
def IntersectSphere(rayPos, rayDir, spherePos, radius):
    
    
    offsetRayOrigin = minusTuple(rayPos, spherePos)

    a = tupleDot(rayDir, rayDir)
    b = 2 * tupleDot(offsetRayOrigin, rayDir)
    c = tupleDot(offsetRayOrigin, offsetRayOrigin) - radius*radius

    d = b*b - 4 * a * c

    if d >= 0:
        dst = (-b - math.sqrt(d)) / (2 * a)

        if d >= 0:
            distance = dst
            position = multiplyTupleByValue(addTuple(rayPos, rayDir), dst)
            normal = normalize(minusTuple(position, spherePos))

    return distance, normal

@jit
def sceneTrace(rayPos, rayDir, distance):
    albedo = (0,0,0)
    emissive = (0,0,0)
    d, normal = IntersectSphere(rayPos, rayDir, (-10,0,20), 1)
    if d < distance:
        distance = d
        albedo = (1,0.1,0.1)

    d, normal = IntersectSphere(rayPos, rayDir, (0,0,20), 1)
    if d < distance:
        distance = d
        albedo = (0.1,1,0.1)

    d, normal = IntersectSphere(rayPos, rayDir, (10,0,20), 1)
    if d < distance:
        distance = d
        albedo = (0.1,0.1,1)

    d, normal = IntersectSphere(rayPos, rayDir, (10,10,20), 5)
    if d < distance:
        distance = d
        emissive = multiplyTupleByValue((1,0.9,70),100)


    return albedo, emissive, normal, distance
@jit
def GetColourForRay(startRayPos, startRayDir):
    colour = (0,0,0)
    
    for r in range(10):
        ret = (0,0,0)
        throughput = (1,1,1)
        rayPos = startRayPos
        rayDir = startRayDir
        
        for i in range(1):
            distance = maxRayDepth
            
            normal = (0,0,0)
            emissive = (startEmmisive,startEmmisive,startEmmisive)
            albedo = (0,0,0)


            albedo, emissive, normal, distance = sceneTrace(rayPos, rayDir, distance)

            if distance == maxRayDepth:
                break
        
            rayPos = addTuple((multiplyTupleByValue(addTuple(rayPos, rayDir), distance)), multiplyTupleByValue(normal, 0.00001))
        
            rayDir = normalize(addTuple(normal, randomUnitVector()))
        
            ret = addTuple(ret, multiplyTuple(throughput, emissive))
        

            throughput = multiplyTuple(albedo, throughput)
            
        colour = divideTupleByValue(addTuple(ret, colour),2)
    return colour
@jit
def tracePixel(i, j, frame):
    # Where the ray starts. Camera pos 
    rayPos = (0,0,0)
        
    cameraDistance = 1/math.tan(90 * 0.5 * 3.14159265 / 180)

    # Target one unity away from the z axis
    rayTarget = (((i/width)*2-1), (((j/height)*2-1)*-1) /aspectRatio,cameraDistance)

        

    rayDir = (normalize(minusTuple(rayTarget, rayPos)))

    colour = GetColourForRay(rayPos, rayDir)

    colour = multiplyTupleByValue(colour,255)

    adverageColour = lerpTupleByValue(colour, pixels[i,j], (frame) / 5) #divideTupleByValue(addTuple(pixels[i,j], colour), 2)
    #print(pixels[i,j], adverageColour)
    pixels[i,j] = tupleToInt(adverageColour)
    

loops = 1
frame = 0
startTime = time.time()
processes = []
if __name__ == '__main__':    
    
    for q in range(loops):
        for i in range(width):
            for j in range(height):
                
                tracePixel(i,j, frame)
                """ p = multiprocessing.Process(target=tracePixel, args=[i,j])
                p.start()
                processes.append(p)
                
        for process in processes:
            process.join() """

        print(str(q) + ": Out of " + str(loops) + "    " + str(q/loops*100) + "%")
            
        frame += 1
    print("End")
    print("Time: " +str(startTime - time.time()))
    im.show()


    
