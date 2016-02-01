import tkinter as tk

from view import Application


if __name__ == "__main__":
    root = tk.Tk()
    app = Application(master=root)    
    root.mainloop()
    root.quit()
