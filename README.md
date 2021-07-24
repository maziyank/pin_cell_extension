# Pin Cell Extension
---

Jupyter NB Extension to pin your important cell in the sidebar. Save your precious time scrolling up and down just for looking another cell.

## Install Extension

Make sure you already installed [jupyter_contrib_nbextensions](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/install.html)

``` pip install jupyter_contrib_nbextensions ``` 
or
``` conda install -c conda-forge jupyter_contrib_nbextensions ```

Currently this extension is not part of `jupyter_contrib_nbextensions`. So you need to copy folder `pin_cell` to your `jupyter_contrib_nbextensions` folder in your machine. F

or example in Windows `/Users/username/anaconda3/envs/jupyterexperiments/lib/python3.7/site-packages/jupyter_contrib_nbextensions/nbextensions`.

After that, open your terminal and install this extension using below command:

``` jupyter nbextension install pin_cell ```

## Enable Extension
``` jupyter nbextension enable pin_cell/main ```

## Usage
- Select a cell that you want to pinned.
- Click pin cell icon in the toolbar

![Pin Cell](pin_cell/pin_cell.gif "Pin Cell")

