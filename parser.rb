require 'json'

class Parser
  def self.parse(input, output)
    tem = {}
    # user_or = []
    # user_sh = []

    # IO.readlines(input).each do |line, index|
    #   tem_arr = line.split("|")
    #   next if tem_arr[0] == 'user'
    #   user = tem_arr[1]
    # end

    IO.readlines(input).each_with_index do |line, index|
      line = line.gsub(/\n/, '')
      tem_arr = line.split("|")
      next if tem_arr[0] == 'user'

      tem_hash = {}
      # user = tem_arr[0]
      # with user
      if tem_arr.size == 4
        date = tem_arr[1]
        srcLoc = tem_arr[2]
        destLoc = tem_arr[3]
      else # without user column
        date = tem_arr[0]
        srcLoc = tem_arr[1]
        destLoc = tem_arr[2]
      end

      # puts date, srcLoc, destLoc

      if !tem[date.to_sym].nil?
        # puts date, srcLoc, destLoc
        (tem[date.to_sym][srcLoc.to_sym] ||= []) << [srcLoc.split(",").map { |cood| cood.to_f},destLoc.split(",").map { |cood| cood.to_f}]
      else
        # puts date, srcLoc, destLoc
        tem[date.to_sym] = {}
        tem[date.to_sym][srcLoc.to_sym] = [].push [srcLoc.split(",").map { |cood| cood.to_f},destLoc.split(",").map { |cood| cood.to_f}]
      end

      # tem_hash[:destLoc] = tem_arr[3]
      # tem_hash[:distInKms] = tem_arr[4]

      # user_or.push(user)
      # user_sh.push(user[-15, 4])
      # puts user[-2, 2]

      # if tem[date.to_sym]
      #   tem[date.to_sym][date.to_sym] = tem_hash
      # else
      #   tem[user.to_sym] = {}
      #   tem[user.to_sym][date.to_sym] = tem_hash
      # end
    end

    # write
    File.open(output, 'w') do |file|
      file.puts JSON.generate(tem)
    end

    # puts "original length: #{user_or.uniq.size}: shortened length: #{user_sh.uniq.size}"
    puts tem.inspect
  end

  def self.parse_mig(input, output)
    result = {}
    File.open(input).each do |line|
      arr = line.split("|")
      hash = {}
      if arr[0] == "Kabul"
        src = arr[1]
        dest = arr[0]
        freq = arr[2]
        tip_out = "Migration out:#{arr[2]}"
      end
    end
  end
end