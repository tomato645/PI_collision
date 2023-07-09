#include <iostream>
#include <iomanip>

#include "spdlog/spdlog.h"

const int LOOP_NUM = 10000;
const double NUM = 2;
const double dt = 0.001;

int collisionCount = 0;

// x, r, m, v
double small[4] = {30, 10, 1, 0};
double big[4] = {70, 20, 10000000000, -1};

int main()
{
    std::cout << "hello" << std::endl;

    long long int i = 0;
    while(true)
    {
        if (i % 1000000000 == 0)
        {
            spdlog::info("Now, we are calculating {} times", i);
        }

        small[0] += small[3] * dt;
        big[0] += big[3] * dt;

        if (small[0] - small[1] <= 0)
        {
            small[3] *= (-1);
            collisionCount++;
            // std::cout << "collision" << i << std::endl;
        }
        if (abs(small[0] - big[0]) <= (small[1] + big[1]))
        {
            double m1 = small[2];
            double m2 = big[2];
            double v1 = small[3];
            double v2 = big[3];

            small[3] = (((m1 - m2) / (m1 + m2)) * v1) + ((2 * m2 * v2) / (m1 + m2));
            big[3] = ((2 * m1 * v1) / (m1 + m2)) + (((m2 - m1) / (m1 + m2)) * v2);

            collisionCount++;
            // std::cout << "collision" << i << std::endl;
        }
        if (small[3] >= 0 && big[3] >= 0 && (big[3] - small[3]) >= 0)
        {
            std::cout << "small: " << small[0] << ", " << std::setprecision(10) << small[3] << ", "
                      << "big: " << big[0] << ", " << big[3] << std::endl;
            std::cout << "--------------no more--------------" << std::endl;
            break;
        }

        // std::cout << "small: " << small[0] << ", " << std::setprecision(10) << small[3] << ", "
        //           << "big: " << big[0] << ", " << big[3] << std::endl;
        
        i++;
    }

    std::cout << std::endl;
    std::cout << "collision: " << collisionCount << "times" << std::endl;
}