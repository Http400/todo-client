import React, { useEffect } from 'react';
import { Form as AntDForm, Input, Select, Button, Radio, Rate } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { Store, Rule } from 'rc-field-form/lib/interface';

export type inputDef = {
    type: 'input' | 'textarea' | 'password' | 'select' | 'radio' | 'rate';
    label: string | JSX.Element;
    name: string;
    rules?: Rule[];
    options?: { label: any, value: number }[],
    count?: number;
    rows?: number
};

const generateInputs = (inputs: inputDef[]): JSX.Element[] => {
    return inputs.map((input, index) => {
        let item = null;

        switch (input.type) {
            case 'input': 
                item = <Input />
                break;
            case 'textarea':
                item = <Input.TextArea rows={input.rows || 4} />
                break;
            case 'password':
                item = <Input.Password />;
                break;
            case 'select':
                item = <Select>
                    {input.options?.map(option => (
                        <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                    ))}
                </Select>;
                break;
            case 'radio':
                item = <Radio.Group>
                    {input.options?.map(option => (
                        <Radio.Button key={option.value} value={option.value}>{option.label}</Radio.Button>
                    ))}
                </Radio.Group>
                break;
            case 'rate':
                item = <Rate count={input.count} />;
                break;
            default:
                throw new Error('Lack of input type');
        }

        return (
            <AntDForm.Item
                key={index}
                label={input.label}
                name={input.name}
                validateTrigger={['onChange', 'onBlur']}
                rules={input.rules}
            >
                {item}
            </AntDForm.Item>
        );
    });
};

const defaultLayout = {
    labelCol: { flex: '100px' },
    wrapperCol: { flex: 'auto' }
};

const defaultTailLayout = {
    // wrapperCol: {
    //     xs: { span: 24, justify: 'center' },
    //     sm: { marginLeft: '100px', span: 18 }
    // },
    style: {
        marginLeft: '100px'
    }
};

// const defaultLayout = {
//     labelCol: { 
//         xs: { span: 24 },
//         sm: { span: 6 }
//     },
//     wrapperCol: { 
//         xs: { span: 24 },
//         sm: { span: 18 }
//     },
// };

// const tailLayout = {
//     wrapperCol: { 
//         xs: { span: 24, justify: 'center' },
//         sm: { offset: 6, span: 18 }
//     },
// };

type Props = {
    name: string,
    inputs: inputDef[],
    initialValues?: { [key: string]: any },
    err?: { [key: string]: any },
    layout?: any,
    tailLayout?: any,
    onSubmit: (values: any) => void
};

const Form = ({ name, inputs, initialValues, err, layout = defaultLayout, tailLayout = defaultTailLayout, onSubmit }: Props) => {
    const [ form ] = AntDForm.useForm();

    useEffect(() => {
        if (err) {
            const e: { name: string, errors: string[] }[] = [];
            for (let key in err) {
                e.push({ name: key, errors: [ err[key] ] });
            }
            console.log(e);
            form.setFields(e);
        }
    }, [form, err]);

    useEffect(() => {
        if (initialValues) form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const handleFinish = (values: Store) => {
        console.log(values);
        onSubmit(values);
    }

    return (
        <AntDForm
            name={name}
            form={form}
            initialValues={initialValues}
            {...layout}
            onFinish={handleFinish}
        >
            {generateInputs(inputs)}
            <AntDForm.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" shape='round'>
                    <CheckOutlined /> Submit
                </Button>
            </AntDForm.Item>
        </AntDForm>
    );
}

export default Form;
