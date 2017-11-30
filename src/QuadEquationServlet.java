import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

@WebServlet("/getSolution")
public class QuadEquationServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        double a = Double.parseDouble(req.getParameter("a"));
        double b = Double.parseDouble(req.getParameter("b"));
        double c = Double.parseDouble(req.getParameter("c"));
        String[] solution = solve(a, b, c);
        resp.getWriter().write("{ \"x1\": \"" + solution[0] + "\", \"x2\": \"" + solution[1] + "\" }");
    }

    private String[] solve(double a, double b, double c) {
        String[] result = new String[2];
        double d = b*b-4*a*c;
        if (d < 0) {
            result[0] = "-";
            result[1] = "-";
        }
        if (d == 0) {
            result[0] = Double.toString(-b/(2*a));
            result[1] = "-";
        }
        if (d > 0) {
            result[0] = Double.toString((-b+Math.sqrt(d))/(2*a));
            result[1] = Double.toString((-b-Math.sqrt(d))/(2*a));
        }
        return result;
    }

}