import { Formik, FormikHelpers, FormikValues, Form as FormikForm, FormikProps } from 'formik';
import { ReactNode } from 'react'
import * as Yup from 'yup';

type FormProps<T extends FormikValues> = {
    initialValues: T;
    validationSchema: Yup.ObjectSchema<T>;
    onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
    children: ((formikProps: FormikProps<T>) => ReactNode) | ReactNode;
};


const Form =<T extends FormikValues> ({ initialValues, validationSchema, onSubmit, children }: FormProps<T>) => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formikProps: FormikProps<T>) => (
                <FormikForm>
                    {typeof children === 'function' ? children(formikProps) : children}
                </FormikForm>
            )}
        </Formik>
    );
}

export default Form