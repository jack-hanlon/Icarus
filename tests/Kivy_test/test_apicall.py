from api_call import ApiCall
import matplotlib.pyplot as plt


test = ApiCall(43, 79)
data = test.unpack_data()

plt.plot(data[1], data[0])
plt.show()