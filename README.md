# Clean Architecture Practice Repository 🏗️

A modular Node.js/Typescript implementation demonstrating Clean Architecture principles with Domain-Driven Design (DDD) concepts. Focused on separation of concerns and testability.

## Key Features ✨

- 🧠 Strict layer separation: Domain > Application > Infrastructure
- 🏭 Rich domain models with validation and factories
- 🧪 Comprehensive test coverage (unit & integration)
- 🚦 Event-driven architecture implementation
- 📦 Sequelize ORM integration with pure domain models
- 🛠️ SOLID principles applied across all layers

## Core Concepts 💡

_(Rich domain model with business rules and validation)_

```typescript
export default class Customer extends Entity {
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get Address(): Address {
    return this._address;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
```

_(Typical use case implementation)_

```typescript
export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(input.name, new Address(input.address.street, input.address.number, input.address.zip, input.address.city));

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}
```

## Project Structure 📂

```
src/
├── domain/ # Core business logic
│ ├── @shared/ # Cross-domain utilities
│ ├── customer/ # Customer aggregate
│ ├── product/ # Product aggregate
│ └── checkout/ # Order processing
├── infrastructure/ # External implementations
│ ├── customer/ # Customer persistence
│ └── product/ # Product persistence
├── usecase/ # Application logic
└── api/ # Delivery mechanisms
```

### Key Architectural Layers

1. **Domain Layer** - Pure business logic:

   - Entities
   - Value Objects
   - Domain Events
   - Repository interfaces

2. **Application Layer**:

   - Use Cases
   - DTOs
   - Application services

3. **Infrastructure Layer**:

   - Database implementations
   - Framework integrations
   - External services

4. **Presentation Layer**:
   - REST API endpoints
   - GraphQL resolvers (potential extension)
   - CLI interfaces (potential extension)

## Technologies Used 🛠️

- TypeScript
- Sequelize (ORM)
- Express.js
- Jest (Testing)
- Yup (Validation)

## Testing Strategy 🧪

**Unit Tests**

```typescript
const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });

  it("should thrown an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should thrown an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
  });
});
```

**Integration Tests**

```typescript
describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
```

## Getting Started 🚀

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Run tests:

```bash
npm test
```

## Key Design Patterns 🔑

- Repository Pattern
- Factory Pattern
- Observer Pattern (Events)
- Strategy Pattern (Validators)
- Dependency Injection

---

**Learning Goals** 🎯  
This implementation focuses on:

- Maintaining domain purity
- Framework independence
- Test-driven development
- Clear layer boundaries
- Business rule encapsulation
