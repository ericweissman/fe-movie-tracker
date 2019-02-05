import { fetchData, postData, deleteData } from "./api";

describe("api", () => {
  let mockURL;
  let mockData;

  describe("fetchData", () => {
    beforeEach(() => {
      window.fetch = jest.fn();
      mockURL = "www.movietracker.com";
      mockData = [
        {
          vote_count: 3078,
          id: 297802,
          video: false,
          vote_average: 6.9,
          title: "Aquaman",
          popularity: 805.109,
          poster_path: "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
          original_language: "en",
          original_title: "Aquaman"
        }
      ];
    });

    it("should call fetch with the correct parameters", () => {
      fetchData(mockURL);
      expect(window.fetch).toHaveBeenCalledWith(mockURL);
    });

    it("should return the correct data if everything is OK", async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData)
        })
      );
      const results = await fetchData(mockURL);
      expect(results).toEqual(mockData);
    });

    it("should throw an error if fetch is NOT Ok", async () => {
      const expectedError = Error("Error fetching, 401");
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: false,
          status: 401
        })
      );
      await expect(fetchData(mockURL)).rejects.toEqual(expectedError);
    });
  });

  describe('postData', () => {
    let mockUrl
    let mockData;
    let mockSuffix;
    let mockOptions;
    beforeEach(() => {
      mockSuffix = '/favorites'
      mockUrl = "http://localhost:3000/api/users" + mockSuffix;
      mockData = { email: 'hill@hill.com', password: 'password' }
      window.fetch = jest.fn()
      mockOptions = {
        method: 'POST',
        body: JSON.stringify(mockData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });

    it('should call fetch with the correct params', () => {
      postData(mockSuffix, mockData)
      expect(window.fetch).toHaveBeenCalledWith(mockUrl, mockOptions)
    })

    it('should return data if response is ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true, 
        json: () => Promise.resolve(mockData)
      }))

      const result = await postData(mockSuffix, mockData)
      expect(result).toEqual(mockData)
    })

    it('should throw an error if fetch is not ok', async () => {
      const expectedError = Error('Error fetching, 401')
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
        status: 401
      }))

      await expect(postData(mockSuffix, mockData)).rejects.toEqual(expectedError)
    })
  });

  describe('deleteData', () => {
    let mockUrl
    let mockData;
    let mockSuffix;
    let mockOptions;
    beforeEach(() => {
      mockSuffix = '/favorites'
      mockUrl = "http://localhost:3000/api/users" + mockSuffix;
      mockData = { email: 'hill@hill.com', password: 'password' }
      window.fetch = jest.fn()
      mockOptions = {
        method: 'DELETE',
        body: JSON.stringify(mockData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });

    it('should return the correct data if everything is ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      }))
      const results = await deleteData(mockSuffix, mockData)
      expect(results).toEqual(mockData)
    })

    it('should throw an error if eveything is not ok', async () => {
        const expectedError = Error('Error fetching, 401')
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: false,
          status: 401
        }))

        await expect(deleteData(mockSuffix, mockData)).rejects.toEqual(expectedError)
    })
  });
});
