class SingletonTester
{
  static isSingleton(generator)
  {
    let g1 = generator();
    let g2 = generator();
    return g1 == g2;
  }
}