import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { isValidPhone } from '../../utils/helpers';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  // use useNavigation() hook from react-router to access form action/submition state in this case
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // use useActionData() hook from react-router to get the data return from action that is associcated with component
  const formErrors = useActionData();

  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* magic react-router use this '<Form method="POST"></Form>' to capture
      form data automatically and pass them to action() so later can be used to send to API */}
      <Form method="POST">
        <div>
          <label htmlFor="name">First Name</label>
          <input id="name" type="text" name="customer" required />
        </div>

        <div>
          <label htmlFor="phone">Phone number</label>
          <div>
            <input id="phone" type="tel" name="phone" required />
          </div>

          {formErrors?.phone && <p>{formErrors?.phone}</p>}
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <div>
            <input id="address" type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input name="cart" value={JSON.stringify(cart)} type="hidden" />
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Creating order...' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  );
}

// actions are used to mutate data or send data to API using react-router
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  // Error handling before submitting to API
  // construct errors object, pass component
  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = 'Please provide a valid phone number!';

  // pass errors{} if there is any, component can access this data later
  if (Object.keys(errors).length > 0) return errors;

  // NO error create the order and redirect
  const createdOrder = await createOrder(order);

  // react-route provides redirect() since the useNavigate is
  // not allowed since its not a component rather a action function
  return redirect(`/order/${createdOrder.id}`);
}

export default CreateOrder;
