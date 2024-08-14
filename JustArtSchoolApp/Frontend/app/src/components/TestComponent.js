import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

function TestComponent() {
    const [products, setProducts] = useState([
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Smith', age: 34 },
    ]);
    const [productDialog, setProductDialog] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [product, setProduct] = useState({ id: '', name: '', age: '' });
    const toast = useRef(null);

    const openNew = () => {
        setProduct({ id: Date.now(), name: '', age: '' });
        setEditIndex(null);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setProductDialog(false);
    };

    const saveProduct = () => {
        let _products = [...products];
        if (editIndex !== null) {
            _products[editIndex] = product;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            _products.push(product);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        setProducts(_products);
        setProductDialog(false);
        setProduct({ id: '', name: '', age: '' });
    };

    const editProduct = (product) => {
        const index = products.findIndex(p => p.id === product.id);
        setEditIndex(index);
        setProduct({ ...product });
        setProductDialog(true);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
            </React.Fragment>
        );
    };

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card">
                <Button label="Add Row" icon="pi pi-plus" className="p-button-success mb-3" onClick={openNew} />
                <DataTable value={products} paginator rows={10}>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="age" header="Age" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header={editIndex !== null ? 'Edit Row' : 'Add Row'} modal className="p-fluid" onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required autoFocus />
                </div>
                <div className="p-field">
                    <label htmlFor="age">Age</label>
                    <InputText id="age" value={product.age} onChange={(e) => setProduct({ ...product, age: e.target.value })} required />
                </div>

                <div className="p-dialog-footer">
                    <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                    <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
                </div>
            </Dialog>
        </div>
    );
}

export default TestComponent;
