import kivy
from kivy.app import App
from kivy.lang import Builder
from kivy.uix.behaviors import button
from kivy.uix.floatlayout import FloatLayout 

from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.image import Image
from kivy.uix.textinput import TextInput
from kivy.uix.gridlayout import GridLayout
from kivy.garden.matplotlib.backend_kivyagg import FigureCanvasKivyAgg

import matplotlib.pyplot as plt
import numpy as np
from api_call import ApiCall


# Funk to test matplotlib
# def draw_cos():
#     x = np.linspace(-4*np.pi, 4*np.pi, 200)
#     y = np.cos(x) + np.random.normal(0, .1, x.shape)
#     plt.plot(x,y)
#     fig = plt.gcf()
#     return fig   

def fetch_data(lat, lon):
    api_call = ApiCall(lat, lon)
    temp, dates = api_call.unpack_data()
    return temp, dates
    
def make_fig(x, y,lat, lon):
    plt.plot(x,y)
    plt.title(f"temp data for lat:{lat} lon{lon}")
    fig = plt.gcf()
    return fig
    
class FloatGrid(FloatLayout):
    def __init__(self, **kwargs):
        super(FloatGrid, self).__init__(**kwargs)

        self.add_widget(Label(text="lat",
                              size_hint = (.2,.1),
                              pos=(-50,500)))
        
        self.lat = TextInput(multiline=False,
                             size_hint = (.2,.1),
                            pos=(75,500))
        
        self.add_widget(self.lat)
        
        self.add_widget(Label(text="lon",
                              size_hint = (.2,.1),
                              pos=(200,500)))
        
        self.lon = TextInput(multiline=False,
                             size_hint = (.2,.1),
                             pos=(300,500))
        self.add_widget(self.lon)
        
        self.submit = Button(text ='submit',
                            size_hint =(.2, .1),
                            pos =(500, 500))
        self.submit.bind(on_press=self.pressed)
        self.add_widget(self.submit)
        
        self.box = self.ids.box
        #self.cos_wave_fig = draw_cos()
        #box.add_widget(FigureCanvasKivyAgg(self.cos_wave_fig))
        
    def pressed(self, insance):
        lat, lon = self.lat.text, self.lon.text
        temp, dates = fetch_data(lat, lon)
        fig = make_fig(dates, temp, lat, lon)
        self.box.add_widget(FigureCanvasKivyAgg(fig))
        
        
    
class MyApp(App):
    def build(self):
        Builder.load_file('my.kv')
        return FloatGrid()

if __name__=="__main__":
    MyApp().run()